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
      className="bg-gray-500 flex flex-col w-min p-2"
    >
      <input type="text" name="message" placeholder="Message" />
      <input type="text" name="channelId" placeholder="Channel ID" />
      <input type="submit" value="Send" />
    </form>
  );
}
