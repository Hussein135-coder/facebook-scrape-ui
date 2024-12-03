import { useState, useEffect } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getConfig, pagesInformation, updateConfig } from "../services/api";

const ConfigForm: React.FC = () => {
  const [facebookEmail, setFacebookEmail] = useState("");
  const [facebookPassword, setFacebookPassword] = useState("");
  const [botToken, setBotToken] = useState("");
  const [telegramChatIds, setTelegramChatIds] = useState<string[]>([""]);
  const [pages, setPages] = useState<string[]>([""]);

  useEffect(() => {
    const fetchConfig = async () => {
      const data = await getConfig();
      setFacebookEmail(data.facebookEmail);
      setFacebookPassword(data.facebookPassword);
      setBotToken(data.botToken);
      setTelegramChatIds(data.telegramChatIds);
      setPages(data.pages);
    };
    fetchConfig();
  }, []);

  const handleAddField = (
    setFunction: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFunction((prev) => [...prev, ""]);
  };

  const handleRemoveField = (
    index: number,
    setFunction: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFunction((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    value: string,
    setFunction: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFunction((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateConfig({
      facebookEmail,
      facebookPassword,
      botToken,
      telegramChatIds,
      pages,
    });
    alert("Configuration updated successfully!");
  };

  return (
    <form
      className="w-full max-w-lg bg-slate-800 text-gray-50 p-8 rounded shadow-md"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Facebook Email"
        name="facebookEmail"
        value={facebookEmail}
        onChange={(e) => setFacebookEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputProps={{
          style: {
            color: "white",
            borderColor: "white",
          },
        }}
        InputLabelProps={{
          style: { color: "rgb(249 250 251)" },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      <TextField
        label="Facebook Password"
        name="facebookPassword"
        type="password"
        value={facebookPassword}
        onChange={(e) => setFacebookPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputProps={{
          style: { color: "white" },
        }}
        InputLabelProps={{
          style: { color: "rgb(249 250 251)" },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      <TextField
        label="Bot Token"
        name="botToken"
        value={botToken}
        onChange={(e) => setBotToken(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputProps={{
          style: { color: "white" },
        }}
        InputLabelProps={{
          style: { color: "rgb(249 250 251)" },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />

      <div className="mt-4">
        <h3 className="font-bold mb-4">Telegram Chat IDs:</h3>
        {telegramChatIds?.map((chatId, index) => (
          <div key={index} className="flex items-center mb-2">
            <TextField
              label={`Chat ID ${index + 1}`}
              value={chatId}
              onChange={(e) =>
                handleInputChange(index, e.target.value, setTelegramChatIds)
              }
              fullWidth
              required
            />
            <IconButton
              onClick={() => handleRemoveField(index, setTelegramChatIds)}
              disabled={telegramChatIds.length === 1}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddField(setTelegramChatIds)}
          startIcon={<AddIcon />}
        >
          Add Chat ID
        </Button>
      </div>

      <div className="mt-4 mb-6">
        <h3 className="font-bold mb-4">Facebook Pages:</h3>
        {pages?.map((page, index) => (
          <div key={index}>
            <h3 className="mb-3 font-semibold text-center">
              {pagesInformation[page.slice(-7)]}
            </h3>
            <div className="flex items-center mb-2">
              <TextField
                label={`Page ${index + 1}`}
                value={page}
                onChange={(e) =>
                  handleInputChange(index, e.target.value, setPages)
                }
                fullWidth
                required
              />
              <IconButton
                onClick={() => handleRemoveField(index, setPages)}
                disabled={pages.length === 1}
              >
                <RemoveIcon />
              </IconButton>
            </div>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddField(setPages)}
          startIcon={<AddIcon />}
        >
          Add Page
        </Button>
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="w-full mt-4"
      >
        Save
      </Button>
    </form>
  );
};

export default ConfigForm;
