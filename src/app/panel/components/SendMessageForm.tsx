"use client";

export function SendMessageForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/admin/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return alert("Message sent");
    alert("Couldn't send message");
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      method="POST"
      className="bg-purple-600 flex flex-col p-4 border-2 rounded-md gap-3"
    >
      <input
        type="text"
        name="message"
        placeholder="Message"
        className="border-2 p-1 rounded-md"
      />
      <input
        type="text"
        name="channelId"
        placeholder="Channel ID"
        className="border-2 p-1 rounded-md"
      />
      <input
        type="submit"
        value="Send"
        className="bg-pink-400 hover:bg-pink-500 border-2 rounded-md p-1 font-bold cursor-pointer transition"
      />
    </form>
  );
}
