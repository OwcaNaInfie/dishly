interface HeadingProps {
  title: string;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  className?: string;
}

const headingStyles: Record<HeadingProps['type'], string> = {
  h1: 'text-5xl font-fascinate text-neutral leading-tight mb-16',
  h2: 'text-4xl font-slab font-thin text-neutral leading-tight mb-12',
  h3: 'text-3xl font-slab font-light text-neutral leading-tight mb-6',
  h4: 'text-xl font-slab font-bold text-neutral leading-tight uppercase mb-4',
  h5: 'text-lg font-fascinate text-neutral leading-tight mb-2'
};

const Heading  = ({ title, type, className, ...props }: HeadingProps) => {
  const Tag = type;
  const styles = `${headingStyles[type]} ${className || ''}`; 

  return <Tag className={styles.trim()} {...props}>{title}</Tag>;
};

export default Heading;
