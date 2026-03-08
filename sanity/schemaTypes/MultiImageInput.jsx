import { useCallback, useState } from "react";
import { Stack, Button, Card, Text, Spinner, Flex } from "@sanity/ui";
import { insert } from "sanity";

export default function MultiImageInput(props) {
  const { onChange, value = [] } = props;
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState({ current: 0, total: 0 });

  const handleFileChange = useCallback(
    async (event) => {
      const files = Array.from(event.target.files);
      if (files.length === 0) return;

      setUploading(true);
      setUploadCount({ current: 0, total: files.length });

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadCount({ current: i + 1, total: files.length });

        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "sanity");
          formData.append("folder", "sanity-gallery");

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) throw new Error("Upload failed");

          const data = await response.json();

          onChange(
            insert(
              [
                {
                  _type: "galleryImage",
                  _key: `cloudinary-${Date.now()}-${i}`,
                  url: data.secure_url,
                  alt: file.name,
                },
              ],
              "after",
              value.length > 0 ? [value.length - 1] : [-1]
            )
          );
        } catch (err) {
          console.error(`File ${i + 1} upload failed:`, err);
        }
      }

      setUploading(false);
      event.target.value = "";
    },
    [onChange, value]
  );

  return (
    <Stack space={3}>
      <Button
        as="label"
        mode="ghost"
        text={uploading ? "अपलोड हो रहा है..." : "कई तस्वीरें अपलोड करें"}
        tone="primary"
        disabled={uploading}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          disabled={uploading}
        />
      </Button>

      {uploading && (
        <Card padding={3} radius={2} shadow={1}>
          <Flex align="center" gap={3}>
            <Spinner />
            <Text size={1}>
              {uploadCount.current} / {uploadCount.total} अपलोड हो रही हैं...
            </Text>
          </Flex>
        </Card>
      )}

      {value.length > 0 && (
        <Stack space={3}>
          {value.map((img, i) => (
            <div key={img._key || i} style={{
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)"
            }}>
              <img
                src={img.url}
                alt={img.alt || ""}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div style={{ padding: "8px 12px", fontSize: "12px", color: "#888" }}>
                {img.alt || img.url}
              </div>
            </div>
          ))}
        </Stack>
      )}
    </Stack>
  );
}