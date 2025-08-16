import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Spinner,
	Snippet,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLiskApiTokens } from "@/hooks/useLiskApiTokens";

export function CreateApiTokenModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const { createToken, createLoading, createError, createdToken } = useLiskApiTokens();
	const [desc, setDesc] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createToken(desc);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-lg mx-auto rounded-2xl shadow-2xl bg-default-50">
			<ModalContent>
				<ModalHeader className="flex items-center gap-3 pb-3 bg-default-50 rounded-t-2xl">
					<Icon icon="lucide:key" className="text-2xl text-primary" />
					<span className="text-lg font-semibold">Create API Token</span>
				</ModalHeader>
				<ModalBody>
					<form onSubmit={handleSubmit} className="space-y-6 py-3">
						<Input
							label="Description (optional)"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							placeholder="e.g. For backend integration"
						/>
						{createError && (
							<div className="text-danger font-medium">{createError}</div>
						)}
						{createdToken && (
							<div className="space-y-2">
								<div className="text-success font-medium">Token created!</div>
								<Snippet
									hideSymbol
									variant="bordered"
									size="sm"
									className="mt-1 max-w-full overflow-auto w-full">
									{createdToken.token}
								</Snippet>
								<div className="text-default-500 text-xs">
									Copy and store this token securely. It will not be shown again.
								</div>
							</div>
						)}
					</form>
				</ModalBody>
				<ModalFooter className="flex justify-end pt-2">
					<Button
						onPress={onClose}
						variant="light"
						className="mr-2"
						isDisabled={createLoading}>
						Close
					</Button>
					<Button
						color="primary"
						type="submit"
						isLoading={createLoading}
						onClick={handleSubmit}
						isDisabled={createLoading}>
						{createLoading ? <Spinner size="sm" /> : "Create"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
