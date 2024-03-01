const DownloadButton = () => {
  const handleDownload = () => {
    const fileUrl = "https://example.com/path/to/your/file.pdf";
    window.open(fileUrl, "_blank");
  };

  return <button onClick={handleDownload}>Download File</button>;
};

export default DownloadButton;
