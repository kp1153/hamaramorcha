"use client";

export const portableTextComponents = {
  types: {
    // ─── Cloudinary Image ───────────────────────────────────────────
    cloudinaryImage: ({ value }) => {
      if (!value?.url) return null;
      return (
        <figure className="my-6">
          <img
            src={value.url}
            alt={value.caption || ""}
            className="w-full rounded-lg object-cover"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    // ─── Photo Gallery ──────────────────────────────────────────────
    gallery: ({ value }) => {
      if (!value?.images?.length) return null;
      return (
        <div className="my-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {value.images.map((img, i) => (
            <img
              key={img._key || i}
              src={img.url}
              alt={img.alt || ""}
              className="w-full rounded-lg object-cover aspect-square"
            />
          ))}
        </div>
      );
    },

    // ─── YouTube ────────────────────────────────────────────────────
    youtube: ({ value }) => {
      if (!value?.url) return null;
      const getYouTubeId = (url) => {
        const match = url.match(
          /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        return match ? match[1] : null;
      };
      const videoId = getYouTubeId(value.url);
      if (!videoId) return null;
      return (
        <figure className="my-6">
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={value.caption || "YouTube Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-lg"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    // ─── PDF Document ───────────────────────────────────────────────
    pdfDocument: ({ value }) => {
      const url = value?.file?.asset?.url;
      if (!url) return null;
      return (
        <figure className="my-6">
          {value.caption && (
            <p className="mb-2 font-semibold text-gray-700">{value.caption}</p>
          )}
          <iframe
            src={url}
            width="100%"
            height="800px"
            className="rounded-lg border border-gray-200"
            title={value.caption || "PDF दस्तावेज़"}
          />
          <figcaption className="mt-2 text-right">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              नई विंडो में खोलें ↗
            </a>
          </figcaption>
        </figure>
      );
    },

    // ─── Page Break ─────────────────────────────────────────────────
    break: ({ value }) => {
      if (value?.style === "line") {
        return <hr className="my-8 border-gray-300" />;
      }
      return <div className="my-8" />;
    },
  },

  // ─── Block styles ────────────────────────────────────────────────
  block: {
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed text-gray-800">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 mb-3 text-2xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-5 mb-2 text-xl font-semibold text-gray-900">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-gray-400 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },

  // ─── List styles ─────────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-1 text-gray-800">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-1 text-gray-800">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  // ─── Marks ───────────────────────────────────────────────────────
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    pink: ({ children }) => (
      <span className="text-pink-600">{children}</span>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children}
      </a>
    ),
  },
};