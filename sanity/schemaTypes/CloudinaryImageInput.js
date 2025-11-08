import { useCallback, useState } from "react";
import { Stack, Button, Card, Text, Spinner } from "@sanity/ui";
import { set } from "sanity";

export default function CloudinaryImageInput(props) {
  const { onChange, value } = props;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "sanity");
        formData.append("folder", "sanity-images");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        onChange(set(data.secure_url));
      } catch (err) {
        setError("अपलोड विफल रहा। पुनः प्रयास करें।");
        console.error("Cloudinary upload error:", err);
      } finally {
        setUploading(false);
        event.target.value = "";
      }
    },
    [onChange]
  );

  return (
    <Stack space={3}>
      <Button
        as="label"
        mode="ghost"
        text={uploading ? "अपलोड हो रहा है..." : "तस्वीर चुनें"}
        tone="primary"
        disabled={uploading}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          disabled={uploading}
        />
      </Button>

      {uploading && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={2}>
            <Spinner />
            <Text size={1}>Cloudinary पर अपलोड हो रहा है...</Text>
          </Stack>
        </Card>
      )}

      {error && (
        <Card padding={3} radius={2} tone="critical">
          <Text size={1}>{error}</Text>
        </Card>
      )}

      {value && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={2}>
            <img
              src={value}
              alt="Preview"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Text size={1} muted>
              URL: {value}
            </Text>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
