import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const CombatResultModal = ({ open, onClose, winner, powerstatsComparison }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        O vencedor do combate é: {winner ? winner.name : "Empate"}
      </DialogTitle>
      <DialogContent>
        {Object.keys(powerstatsComparison).length > 0 && (
          <div>
            <DialogContentText>Powerstats:</DialogContentText>
            <ul>
              {Object.values(powerstatsComparison).map((comparison, index) => (
                <li key={index}>{comparison}</li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CombatResultModal;
