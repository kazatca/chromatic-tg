import express from "express";
import { Telegraf } from "telegraf";
import { config } from "./config";
import { getMessage as getChromaticMessage } from "./chromatic";
import { getMessage as getBitbucketMessage } from "./bitbucket";

const app = express();

const tg = new Telegraf(config.tg.token);

const sendMessage = async (message: string) => {
  try {
    await Promise.all(
      config.tg.chatIds.map((chatId) =>
        tg.telegram.sendMessage(chatId, message, {
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true },
        })
      )
    );
  } catch (error: Error | any) {
    console.error(error);
  }
};

app.get("/", (_req, res) => {
  res.send("OK");
});

const hooks: [string, (event: any) => string | undefined][] = [
  ["chromatic", getChromaticMessage],
  ["bitbucket", getBitbucketMessage],
];

hooks.forEach(([hook, getMessage]) => {
  app.post(`/webhook/${hook}`, express.json(), (req, res) => {
    const message = getMessage(req.body);
    if (message) {
      sendMessage(message);
    }
    res.send("OK");
  });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
