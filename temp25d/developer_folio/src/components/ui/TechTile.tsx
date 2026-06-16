import type { TechItem } from '../../types';
import {
  ReactIcon,
  NextjsIcon,
  TypescriptIcon,
  NodejsIcon,
  TailwindIcon,
  RustIcon,
  DockerIcon,
  PostgresqlIcon,
  AwsIcon,
} from './Icons';

export function TechTile({ id, label, title, color }: TechItem) {
  const renderIcon = () => {
    const iconProps = {
      size: 32,
      style: { color },
      className: 'transition-transform duration-200 group-hover:scale-110',
    };

    switch (id) {
      case 'react':
        return <ReactIcon {...iconProps} />;
      case 'nextjs':
        return <NextjsIcon {...iconProps} />;
      case 'typescript':
        return <TypescriptIcon {...iconProps} />;
      case 'nodejs':
        return <NodejsIcon {...iconProps} />;
      case 'tailwind':
        return <TailwindIcon {...iconProps} />;
      case 'rust':
        return <RustIcon {...iconProps} />;
      case 'docker':
        return <DockerIcon {...iconProps} />;
      case 'postgresql':
        return <PostgresqlIcon {...iconProps} />;
      case 'aws':
        return <AwsIcon {...iconProps} />;
      default:
        return (
          <span className="font-heading font-bold text-2xl" style={{ color }}>
            {label}
          </span>
        );
    }
  };

  return (
    <div
      role="img"
      aria-label={title}
      title={title}
      className="bg-bg rounded-xl flex items-center justify-center border border-white/5 aspect-square hover:border-primary/50 transition-all duration-200 cursor-help"
    >
      {renderIcon()}
    </div>
  );
}
