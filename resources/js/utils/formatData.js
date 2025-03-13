function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString("es-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString("es-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }
  export { formatDateTime, formatDate };