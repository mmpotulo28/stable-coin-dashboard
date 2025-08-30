import { Alert } from "@heroui/react";

interface iMessage {
	id?: string;
	message: string;
	type: "error" | "success";
}

export const Message: React.FC<iMessage> = ({ id, message, type }) => {
	return (
		<Alert
			className="my-4"
			title={type === "error" ? "Error" : "Success"}
			description={message}
			color={type === "error" ? "danger" : "success"}
			variant="bordered"
		/>
	);
};

const Messages = ({ messages }: { messages: iMessage[] | undefined }) => {
	return (
		<div className="flex flex-col w-full gap-4">
			{messages?.map((msg) => {
				if (!msg) return null;
				return <Message key={msg.id} {...msg} />;
			})}
		</div>
	);
};

export default Messages;
