import { BentoCard } from '../ui/BentoCard';
import { FauxEditor } from '../ui/FauxEditor';
import { codeSnippet } from '../../data/codeSnippet';

export function CodeSnippetCard() {
  return (
    <BentoCard
      ariaLabel="Code Snippet Editor"
      className="col-span-1 md:col-span-2 lg:col-span-1 row-span-1 p-0 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10">
        <button className="bg-primary text-bg px-4 py-2 rounded-lg font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-200 shadow-lg">
          View Snippets
        </button>
      </div>
      <FauxEditor snippet={codeSnippet} />
    </BentoCard>
  );
}
