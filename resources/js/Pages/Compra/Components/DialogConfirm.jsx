export default function DialogConfirm(children, onConfirm, title, open) {

  const handdleAction = (confirm) => {
    onConfirm(confirm);
  };

  return (
    <>
      <Dialog open={open} onClose={() => handdleAction(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={() => handdleAction(false)}>Cancelar</Button>
          <Button onClick={() => handdleAction(true)} autoFocus>
            {"Sí"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
