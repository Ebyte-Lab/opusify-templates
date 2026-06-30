import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import { assetsApi } from '../../lib/api/assets.api';
import { useUserStore } from '../../stores/userStore';
import { FileCard, formatFileSize } from '../../components/shared/FileCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Avatar } from '../../components/ui/Avatar';
import { Progress } from '../../components/ui/Progress';
import { EmptyState } from '../../components/ui/EmptyState';
import { Search, FolderPlus, UploadCloud, MessageSquare, Send, Trash2, Database, Loader2 } from 'lucide-react';
import { Asset } from '../../types/asset.types';

export const AssetsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  // Filters
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | Asset['type']>('all');

  // Preview / Detail States
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [commentText, setCommentText] = useState('');

  // Upload Simulation States
  const [uploadingName, setUploadingName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Queries
  const { data: assets = [], isLoading: isAssetsLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: assetsApi.getAll
  });

  const { data: discussions = [], refetch: refetchDiscussions } = useQuery({
    queryKey: ['assetDiscussions', selectedAsset?.id],
    queryFn: () => assetsApi.getDiscussions(selectedAsset?.id || ''),
    enabled: !!selectedAsset?.id
  });

  // Mutations
  const uploadMutation = useMutation({
    mutationFn: assetsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      setUploadingName(null);
      setUploadProgress(0);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: assetsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      setSelectedAsset(null);
    }
  });

  const postCommentMutation = useMutation({
    mutationFn: ({ assetId, text }: { assetId: string; text: string }) => {
      if (!user) throw new Error('Not logged in');
      // convert User to TeamMember format
      const sender = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: 'admin' as const,
        lastActive: 'Active now',
        projectCount: 0
      };
      return assetsApi.postComment(assetId, text, sender);
    },
    onSuccess: () => {
      setCommentText('');
      refetchDiscussions();
    }
  });

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      
      // Setup Upload Progress Simulation
      setUploadingName(file.name);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Complete upload
            const fileType: Asset['type'] = file.type.startsWith('image/')
              ? 'image'
              : file.type.startsWith('video/')
              ? 'video'
              : file.name.endsWith('.pdf') || file.name.endsWith('.docx')
              ? 'document'
              : file.name.endsWith('.zip') || file.name.endsWith('.tar')
              ? 'export'
              : 'other';

            uploadMutation.mutate({
              name: file.name,
              type: fileType,
              mimeType: file.type || 'application/octet-stream',
              sizeBytes: file.size,
              url: 'https://picsum.photos/seed/uploaded/600/500',
              folderId: 'root',
              uploadedBy: {
                id: user?.id || 'guest',
                name: user?.name || 'Guest User',
                email: user?.email || '',
                avatarUrl: user?.avatarUrl,
                role: 'admin',
                lastActive: 'Active now',
                projectCount: 0
              },
              usedInProjects: []
            });
            return 100;
          }
          return prev + 25;
        });
      }, 300);
    }
  });

  const handleDelete = (asset: Asset) => {
    if (confirm(`Are you sure you want to permanently delete "${asset.name}"?`)) {
      deleteMutation.mutate(asset.id);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedAsset) return;
    postCommentMutation.mutate({ assetId: selectedAsset.id, text: commentText });
  };

  // Filter asset items
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 select-text">
      {/* Search and Library Filter Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-grow max-w-xl">
          <Input
            placeholder="Search assets by file name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftElement={<Search className="w-4 h-4 text-gray-500" />}
            className="w-full"
          />

          <select
            value={typeFilter}
            onChange={(e: any) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs font-semibold text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All File Types</option>
            <option value="document">Documents</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="export">Exports & Archives</option>
            <option value="other">Shaders & 3D files</option>
          </select>
        </div>
      </div>

      {/* Upload Drag & Drop Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Dropzone Widget */}
        <div className="lg:col-span-1 space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-[160px] ${
              isDragActive
                ? 'border-brand-500 bg-brand-500/5'
                : 'border-surface-border bg-surface-card/45 hover:border-brand-500/40 hover:bg-surface-elevated/10'
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-8 h-8 text-gray-500 mb-3 animate-pulse" />
            <span className="text-xs font-bold text-gray-200">
              {isDragActive ? 'Drop file here...' : 'Upload Asset'}
            </span>
            <p className="text-[10px] text-gray-500 mt-1 max-w-[140px] leading-relaxed">
              Drag & drop or browse spec files (PDF, Blend, MP4, Fig).
            </p>
          </div>

          {/* Active Upload Simulator Loader */}
          {uploadingName && (
            <Card className="p-4 border-brand-500/30 bg-surface-elevated/20">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-gray-300 truncate max-w-[120px]">{uploadingName}</span>
                  <span className="text-brand-400">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} color="bg-brand-500" />
              </div>
            </Card>
          )}

          {/* Asset Stats summary */}
          <Card className="p-5 space-y-3">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Asset Space Allocation
            </h4>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-brand-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-sm font-bold text-white block">3.13 GB</span>
                <span className="text-[9px] text-gray-500 block uppercase font-semibold">Of 10 GB Capacity</span>
              </div>
            </div>
            <Progress value={31.3} color="bg-brand-500 animate-pulse" />
          </Card>
        </div>

        {/* Files Grid Area */}
        <div className="lg:col-span-3">
          {isAssetsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-64 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredAssets.length === 0 ? (
            <EmptyState
              title="No assets found"
              description="Drop some assets or update search terms to populate the design file grid."
              icon={FolderPlus}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredAssets.map((asset) => (
                <FileCard
                  key={asset.id}
                  asset={asset}
                  onPreview={setSelectedAsset}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal - Asset Preview & Live Discussions Thread */}
      <Modal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        title={selectedAsset?.name || 'File Details'}
        size="lg"
      >
        {selectedAsset && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-text">
            {/* Left side: Preview & properties */}
            <div className="space-y-4">
              <div className="w-full h-48 rounded-xl bg-surface-elevated/40 border border-surface-border flex items-center justify-center overflow-hidden relative">
                {selectedAsset.thumbnailUrl ? (
                  <img src={selectedAsset.thumbnailUrl} alt={selectedAsset.name} className="w-full h-full object-cover" />
                ) : (
                  <UploadCloud className="w-12 h-12 text-gray-500" />
                )}
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-surface/90 border border-surface-border text-[9px] font-bold text-gray-400 uppercase">
                  {selectedAsset.type}
                </span>
              </div>

              {/* Specs */}
              <div className="space-y-2 text-xs border border-surface-border/50 p-4 rounded-xl bg-surface-card/30">
                <div className="flex justify-between py-1 border-b border-surface-border/30">
                  <span className="text-gray-500 font-semibold uppercase text-[10px]">Size</span>
                  <span className="text-gray-300 font-bold">{formatFileSize(selectedAsset.sizeBytes)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-border/30">
                  <span className="text-gray-500 font-semibold uppercase text-[10px]">Mime Type</span>
                  <span className="text-gray-300 font-medium truncate max-w-[150px]">{selectedAsset.mimeType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-border/30">
                  <span className="text-gray-500 font-semibold uppercase text-[10px]">Uploaded By</span>
                  <span className="text-gray-300 font-semibold">{selectedAsset.uploadedBy.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-semibold uppercase text-[10px]">Uploaded At</span>
                  <span className="text-gray-300 font-medium">{new Date(selectedAsset.uploadedAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-grow" onClick={() => window.open(selectedAsset.url, '_blank')}>
                  Download Original
                </Button>
                <Button variant="danger" size="sm" leftIcon={<Trash2 className="w-3.5 h-3.5" />} onClick={() => handleDelete(selectedAsset)}>
                  Delete
                </Button>
              </div>
            </div>

            {/* Right side: Live Collaboration Discussions */}
            <div className="flex flex-col h-80 md:h-[400px] border border-surface-border rounded-xl overflow-hidden bg-surface-card/25">
              {/* Discussion Header */}
              <div className="px-4 py-3 bg-surface-elevated/40 border-b border-surface-border/50 shrink-0 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-400" />
                <span className="text-[10px] font-bold text-gray-200 uppercase tracking-wider">File Discussion</span>
              </div>

              {/* Comments Thread list */}
              <div className="flex-grow p-4 overflow-y-auto space-y-3.5 scrollbar-thin select-text">
                {discussions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center h-full text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                    No comments yet
                  </div>
                ) : (
                  discussions.map((comment) => (
                    <div key={comment.id} className="flex gap-2.5 text-xs align-start">
                      <Avatar name={comment.user} src={comment.avatar} size="sm" />
                      <div className="flex-grow bg-surface-elevated/40 border border-surface-border/40 p-2.5 rounded-xl">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-white text-[10px]">{comment.user}</span>
                          <span className="text-[9px] text-gray-500 font-medium">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-300 leading-normal text-[11px] select-text">{comment.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Send Form */}
              <form onSubmit={handlePostComment} className="p-3 border-t border-surface-border/50 bg-surface-elevated/20 shrink-0 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question or add feedback..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-grow rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim() || postCommentMutation.isPending}
                  className="p-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white disabled:opacity-50 transition-colors"
                >
                  {postCommentMutation.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
