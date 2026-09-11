'use client';

import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from '@styles/components/ImageDropzone.module.css';

const ImageDropzone = ({
  name,
  accept,
  required = false,
}: {
  name: string;
  accept: string;
  required?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const applyFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file || !inputRef.current) return;

    const transfer = new DataTransfer();
    transfer.items.add(file);
    inputRef.current.files = transfer.files;

    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
    setFileName(file.name);
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (inputRef.current) inputRef.current.value = '';
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setFileName(null);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={classNames(styles.dropzone, { [styles.dragging]: isDragging, [styles.hasPreview]: Boolean(previewUrl) })}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        applyFiles(event.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        required={required}
        className={styles.hiddenInput}
        onChange={(event) => applyFiles(event.target.files)}
      />
      {previewUrl ? (
        <div className={styles.previewWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Selected preview" className={styles.previewImage} />
          <div className={styles.previewMeta}>
            <span className={styles.fileName}>{fileName}</span>
            <button type="button" className={styles.removeButton} onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.placeholderTitle}>Drop a photo here, or click to browse</span>
          <span className={styles.placeholderHint}>JPEG, PNG, WEBP, or HEIC — up to 8MB</span>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
