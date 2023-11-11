import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearError } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Loader from "../Layout/Loader/Loader";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const currencies = [
  {
    value: "Festival",
    label: "Festival",
  },
  {
    value: "Carnival",
    label: "Carnival",
  },
  {
    value: "Movie",
    label: "Movie",
  },
  {
    value: "Concert",
    label: "Concert",
  },
];
const special_Supply = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "50",
    label: "50",
  },
  {
    value: "100",
    label: "100",
  },
  {
    value: "200",
    label: "200",
  },
  {
    value: "500",
    label: "500",
  },
  {
    value: "800",
    label: "800",
  },
  {
    value: "1000",
    label: "1000",
  },
];
const normal_supply = [
  {
    value: "100",
    label: "100",
  },
  {
    value: "300",
    label: "300",
  },
  {
    value: "500",
    label: "500",
  },
  {
    value: "700",
    label: "700",
  },
  {
    value: "1000",
    label: "1000",
  },
  {
    value: "1200",
    label: "1200",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.newProduct);
  const alert = useAlert();
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [bgAvatar, setBgAvatar] = useState("/Profile.png");
  const [bgAvatarPreview, setBgAvatarPreview] = useState("/Profile.png");

  const [loacalUser, setLocalUser] = useState({
    name: "",
    description: "",
    category: "",
    supply: "",
    specialSupply: "",
    price: "",
  });

  const { name, description, category, supply, specialSupply, price } =
    loacalUser;

  useEffect(() => {
    if (error) {
      alert.error("Please Try Again!!");
      dispatch(clearError());
    } else if (success) {
      alert.success("Event Created Successfully!!");
      dispatch(clearError());
    }
  }, [error]);

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "bgAvatar") {
      const reader2 = new FileReader();

      reader2.onload = () => {
        if (reader2.readyState === 2) {
          setBgAvatarPreview(reader2.result);
          setBgAvatar(reader2.result);
        }
      };

      reader2.readAsDataURL(e.target.files[0]);
    } else {
      setLocalUser({ ...loacalUser, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    // console.log(countryName, stateName);

    const myForm2 = new FormData();

    myForm2.set("name", name);
    myForm2.set("description", description);
    myForm2.set("category", category);
    myForm2.set("supply", supply);
    myForm2.set("special_supply", specialSupply);
    myForm2.set("price", price);
    myForm2.set("images", avatar);
    myForm2.set("bgImage", bgAvatar);

    // console.log(myForm2);
    try {
      dispatch(newProduct(myForm2));
      //   alert.success("Created Event Successfully!!");
      setLocalUser("");
      setAvatar("/Profile.png");
      setAvatarPreview("/Profile.png");
      setBgAvatarPreview("/Profile.png");
      setBgAvatar("/Profile.png");
    } catch (error) {
      alert.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="Dashboard">
          <div className="content">
            <Paper
              sx={{ width: "70vw", height: "80vh", padding: "50px" }}
              elevation={3}
            >
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "50rem" },
                }}
                // noValidate
                autoComplete="off"
                encType="multipart/form-data"
                // onSubmit={registerSubmit}
              >
                <div style={{ marginBottom: "1.2rem" }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                    //   defaultValue="Event Name"
                  />
                  <TextField
                    required
                    id="outlined-multiline-flexible"
                    label="Description"
                    name="description"
                    value={description}
                    onChange={registerDataChange}
                    //   defaultValue="Event Description"
                    maxRows={4}
                  />
                </div>
                <div style={{ marginBottom: "1.2rem" }}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Category"
                    name="category"
                    required
                    value={category}
                    helperText="Please select event Category"
                    onChange={registerDataChange}
                    className="short"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Supply"
                    name="supply"
                    required
                    defaultValue="100"
                    value={supply}
                    onChange={registerDataChange}
                    helperText="Select Normal Ticket Supply"
                    className="medium"
                  >
                    {normal_supply.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Special Supply"
                    name="specialSupply"
                    required
                    defaultValue="0"
                    value={specialSupply}
                    onChange={registerDataChange}
                    helperText="Select If Any VIP ticket"
                    className="medium"
                  >
                    {special_Supply.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Price"
                    required
                    name="price"
                    //   defaultChecked="Festival"
                    value={price}
                    onChange={registerDataChange}
                    helperText="Select Price Per Ticket"
                    className="veryShort"
                  >
                    {normal_supply.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div style={{ display: "flex", gap: "5rem" }}>
                  <div style={{ display: "flex" }}>
                    <img
                      className="preview"
                      src={avatarPreview}
                      alt="Avatar Preview"
                    />
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Event Image
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        name="avatar"
                        onChange={registerDataChange}
                      />
                    </Button>
                  </div>
                  <div style={{ display: "flex" }}>
                    <img
                      className="preview"
                      src={bgAvatarPreview}
                      alt="Avatar Preview"
                    />
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Background Image
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        name="bgAvatar"
                        onChange={registerDataChange}
                      />
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "2rem",
                    marginLeft: "50rem",
                  }}
                >
                  {/* <input type="submit" value="Register" /> */}
                  <Button
                    color="success"
                    variant="contained"
                    sx={{ padding: "15px 30px" }}
                    onClick={registerSubmit}
                  >
                    CREATE EVENT
                  </Button>
                </div>
              </Box>
            </Paper>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
