interface PolaroidFrameProps {
  src: string;
  alt?: string;
}

export function PolaroidFrame({ src, alt = "" }: PolaroidFrameProps) {
  return (
    <div className="bg-white-custom p-1 pb-3 shadow-2xl sm:p-1.5 sm:pb-4.5 md:p-2 md:pb-6">
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
