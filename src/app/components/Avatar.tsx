interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  online?: boolean;
}

export function Avatar({ src, alt, fallback, size = "md", online }: AvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  const onlineSize = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  return (
    <div className="relative flex-shrink-0">
      {src ? (
        <img
          src={src}
          alt={alt || fallback}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-[var(--chat-gray-200)] flex items-center justify-center font-medium text-[var(--chat-gray-700)]`}
        >
          {fallback}
        </div>
      )}
      {online && (
        <div
          className={`${onlineSize[size]} absolute bottom-0 right-0 bg-[var(--chat-green)] rounded-full border-2 border-white`}
        />
      )}
    </div>
  );
}
