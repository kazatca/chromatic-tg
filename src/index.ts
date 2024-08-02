import path from "path";
import dedent from "dedent";
import express from "express";
import { Telegraf } from "telegraf";
import { getBuildMessage } from "./build";
import { Body, Config } from "./types";
import { getReviewMessage } from "./review";
import { getReviewDecisionMessage } from "./review-decision";

const config: Config = require(path.join(process.cwd(), "config.json"));

if (!config) {
  console.error("Config not found");
  process.exit(1);
}

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

const getMessage = async (event: Body) => {
  switch (event.event) {
    case "build": {
      const message = getBuildMessage(event.build);
      if (!message) {
        return;
      }
      return dedent`${message} <a href="${event.build.webUrl}">Build ${event.build.number}</a>`;
    }

    case "review": {
      const message = getReviewMessage(event.review);
      if (!message) {
        return;
      }
      return dedent`${message} <a href="${event.review.webUrl}">Review ${event.review.number}</a>`;
    }

    case "review-decision": {
      const message = getReviewDecisionMessage(event.reviewDecision);
      if (!message) {
        return;
      }
      return dedent`${message} <a href="${event.reviewDecision.review.webUrl}">Review ${event.reviewDecision.review.number}</a>`;
    }
  }
};

const handleWebhook = async (event: Body) => {
  const message = await getMessage(event);
  if (message) {
    await sendMessage(message);
  }
};

app.get("/", (_req, res) => {
  res.send("OK");
});

app.post("/webhook", express.json(), (req, res) => {
  handleWebhook(req.body);
  res.send("OK");
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
