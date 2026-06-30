import React from 'react';
import { Asset } from '../../types/asset.types';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Dropdown } from '../ui/Dropdown';
import { FileText, Image, Video, Archive, File, Download, Trash2, Info, MoreVertical } from 'lucide-react';

interface FileCardProps {
  asset: Asset;
  onPreview?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const FileCard: React.FC<FileCardProps> = ({
  asset,
  onPreview,
  onDelete
}) => {
  const getFileIcon = (type: Asset['type']) => {
    switch (type) {
      case 'image':
        return <Image className="w-8 h-8 text-accent-indigo" />;
      case 'video':
        return <Video className="w-8 h-8 text-accent-teal" />;
      case 'document':
        return <FileText className="w-8 h-8 text-accent-amber" />;
      case 'export':
        return <Archive className="w-8 h-8 text-accent-rose" />;
      default:
        return <File className="w-8 h-8 text-gray-400" />;
    }
  };

  const dropdownItems = [
    {
      label: 'Download File',
      icon: <Download className="w-3.5 h-3.5" />,
      onClick: () => window.open(asset.url, '_blank')
    },
    ...(onPreview ? [{
      label: 'View Details',
      icon: <Info className="w-3.5 h-3.5" />,
      onClick: () => onPreview(asset)
    }] : []),
    ...(onDelete ? [{
      label: 'Delete File',
      icon: <Trash2 className="w-3.5 h-3.5 text-accent-rose" />,
      onClick: () => onDelete(asset),
      variant: 'danger' as const
    }] : [])
  ];

  return (
    <Card
      onClick={() => onPreview?.(asset)}
      className="p-4 flex flex-col justify-between h-64 hover:border-brand-500/20 group cursor-pointer"
    >
      {/* Visual Thumbnail or Icon */}
      <div className="w-full h-32 rounded-lg bg-surface-elevated/40 border border-surface-border/50 flex items-center justify-center overflow-hidden shrink-0 relative">
        {asset.thumbnailUrl ? (
          <img
            src={asset.thumbnailUrl}
            alt={asset.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          getFileIcon(asset.type)
        )}
        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-surface/85 backdrop-blur-[2px] border border-surface-border text-[9px] font-bold text-gray-400 uppercase">
          {asset.type}
        </span>
      </div>

      {/* Info Row */}
      <div className="mt-3 flex-grow flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-200 truncate group-hover:text-brand-400 transition-colors leading-tight" title={asset.name}>
              {asset.name}
            </h4>
            <span className="text-[10px] text-gray-500 font-semibold uppercase mt-0.5 block">
              {formatFileSize(asset.sizeBytes)}
            </span>
          </div>
          
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown
              trigger={
                <button className="p-1 rounded-lg hover:bg-surface-elevated text-gray-500 hover:text-white transition-colors focus-ring">
                  <MoreVertical className="w-4 h-4" />
                </button>
              }
              items={dropdownItems}
            />
          </div>
        </div>

        {/* Footer uploader */}
        <div className="border-t border-surface-border/40 pt-3 mt-3 flex items-center justify-between text-[9px] text-gray-500">
          <div className="flex items-center gap-1.5 min-w-0">
            <Avatar name={asset.uploadedBy.name} src={asset.uploadedBy.avatarUrl} size="sm" />
            <span className="truncate text-gray-400 font-medium">{asset.uploadedBy.name}</span>
          </div>
          <span className="shrink-0 font-medium">{new Date(asset.uploadedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  );
};
