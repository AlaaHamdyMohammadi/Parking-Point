const DownloadButton = () => {
  const handleDownload = () => {
    // You can define the file URL that you want to download
    const fileUrl = "https://example.com/path/to/your/file.pdf";
    // Trigger the download
    window.open(fileUrl, "_blank");
  };

  return <button onClick={handleDownload}>Download File</button>;
};

export default DownloadButton;
