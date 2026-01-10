interface PolaroidFrameProps {
  src: string;
  alt?: string;
}

export function PolaroidFrame({ src, alt = "" }: PolaroidFrameProps) {
  return (
    <div className="bg-white-custom p-1.5 pb-3 shadow-2xl sm:p-2 sm:pb-4 md:p-3 md:pb-8">
      <div className="aspect-square w-full overflow-hidden bg-muted">
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
