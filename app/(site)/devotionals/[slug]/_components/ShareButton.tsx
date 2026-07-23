"use client";

import ShareMenu from "@/components/ShareMenu";

interface ShareButtonProps {
  title: string;
  slug: string;
  image?: string;
  description?: string;
}

const ShareButton = ({ title, slug, image, description }: ShareButtonProps) => {
  return (
    <ShareMenu
      title={title}
      path={`/devotionals/${slug}`}
      image={image}
      description={description}
      label="Share Devotional"
      buttonClassName="mx-auto flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
    />
  );
};

export default ShareButton;
