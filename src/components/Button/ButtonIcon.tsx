import React from "react";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

export default function ButtonIcon() {
    return (
        <Button
            color="lightBlue"
            buttonType="filled"
            size="regular"
            rounded={true}
            block={false}
            iconOnly={true}
            ripple="light"
        >
            <Icon name="favorite" size="sm" />
        </Button>
    )
}