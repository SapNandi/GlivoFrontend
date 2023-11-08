import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
// import { Grid, TextField } from "@mui/material";
import { BsCart4 } from "react-icons/bs";
import Box from "@mui/material/Box";
import Slider from "@mui/material-next/Slider";
import { Typography, makeStyles } from "@mui/material";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import "./TicketForm.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../actions/cartAction";

const TicketForm = () => {
  const { loading, product } = useSelector((state) => state.productDetails);
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [ticketType, setTicketType] = useState("Normal");
  const [tikcet, setTicket] = useState(2);

  const handleTicketChange = (e, value) => {
    setTicket(value);
  };

  const handleTicketType = (e) => {
    setTicketType(e.target.value);
  };

  const handleSubmit = (e) => {
    if (isAuthenticated === false) {
      alert.error("Login To Buy Tickets");
      navigate("/loginSignup");
    }
    console.log(ticketType, tikcet);
  };

  const handleCartSubmit = () => {
    dispatch(addItemToCart(id, tikcet));
    alert.success("Item added to cart!");
  };

  return (
    <form>
      <Box
        sx={{
          width: 250,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            padding: "1rem",
            width: "100%",
          }}
        >
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Ticket Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue="Normal"
              value={ticketType}
              onChange={handleTicketType}
            >
              <FormControlLabel
                value="Normal"
                control={<Radio />}
                label="Normal"
              />
              <FormControlLabel value="VIP" control={<Radio />} label="VIP" />
            </RadioGroup>
          </FormControl>
          <Divider variant="middle" />
          <Typography variant="h6" sx={{ fontSize: "1rem", color: "rgba(0, 0, 0, 1)" }}>
            Choose Tickets
          </Typography>
          <Slider
            disabled={false}
            onChange={handleTicketChange}
            marks={true}
            max={product.supply > 10 ? 10 : product.supply}
            min={1}
            name="ticket"
            valueLabelDisplay="auto"
            value={tikcet}
            style={{ width: 200 }}
          />
          <Button
            className="buybtn"
            variant="contained"
            sx={{ marginTop: ".8rem", gap: "5px" }}
            onClick={handleCartSubmit}
          >
            <BsCart4 style={{ fontSize: "1.2rem", marginBottom: "5px" }} /> Add
            to Cart
          </Button>
        </Paper>
      </Box>
    </form>
  );
};

export default TicketForm;
