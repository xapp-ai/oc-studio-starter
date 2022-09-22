/*! Copyright (c) 2022, XAPP AI */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PasswordInput, PasswordInputProps } from "./PasswordInput";

export default {
    title: `${PasswordInput.name}`,
    component: PasswordInput
} as ComponentMeta<typeof PasswordInput>;

const Template: ComponentStory<typeof PasswordInput> = (args) => <PasswordInput {...args} />;

export const PasswordEmpty = Template.bind({});
PasswordEmpty.args = {
} as Partial<PasswordInputProps>;

export const PasswordWithValue = Template.bind({});
PasswordWithValue.args = {
    value: "abc123"
} as Partial<PasswordInputProps>;

export const PasswordDisabled = Template.bind({});
PasswordDisabled.args = {
    value: "abc123",
    disabled: true
} as Partial<PasswordInputProps>;
