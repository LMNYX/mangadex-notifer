import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Actually a test"),
    async execute(interaction?: any)
    {
        await interaction.reply("Test");
    }
}