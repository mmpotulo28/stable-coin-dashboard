import React from "react";
import { Card, CardHeader, CardBody, Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLiskBusiness } from "@/hooks/useLiskBusiness";

export function EnableGas() {
	const { gasLoading, gasSuccess, gasError, handleEnableGas } = useLiskBusiness();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Icon icon="lucide:zap" className="text-xl" />
					<span className="font-semibold">Enable Gas</span>
				</div>
			</CardHeader>
			<CardBody>
				<Button
					color="primary"
					onPress={handleEnableGas}
					isLoading={gasLoading}
					isDisabled={gasLoading}
					startContent={<Icon icon="lucide:zap" />}>
					Enable Gas
				</Button>
				{gasSuccess && <div className="text-success mt-2">{gasSuccess}</div>}
				{gasError && <div className="text-danger mt-2">{gasError}</div>}
			</CardBody>
		</Card>
	);
}
