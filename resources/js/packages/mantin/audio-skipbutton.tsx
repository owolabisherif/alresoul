import {
    ActionIcon,
    Tooltip,
    type ActionIconProps,
    type ElementProps,
} from '@mantine/core';
import {
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
    IconPlayerSkipForward,
    IconPlayerSkipBack,
    IconPlayerSkipBackFilled,
    IconPlayerSkipForwardFilled,
} from '@tabler/icons-react';
import React, { forwardRef } from 'react';
import { useAudioContext } from '@gfazioli/mantine-audio';

export interface AudioPlayButtonProps
    extends ActionIconProps, ElementProps<'button', keyof ActionIconProps> {
    label?: string;
    btnType?: 'forward' | 'back';
    onClickRef?: () => void;
}

export const AudioSkipButton = forwardRef<
    HTMLButtonElement,
    AudioPlayButtonProps
>(({ btnType = 'forward', onClickRef, ...others }, ref) => {
    const ctx = useAudioContext();
    const label = btnType == 'forward' ? 'Forward' : 'Backward';

    return (
        <Tooltip label={label} withArrow openDelay={400}>
            <ActionIcon
                ref={ref}
                variant="filled"
                color="gray"
                radius="xl"
                aria-label={label}
                onClick={onClickRef}
                data-state={ctx.playing ? 'playing' : 'paused'}
                {...ctx.getStyles('playButton', {
                    style: {
                        width: 'var(--audio-play-size)',
                        height: 'var(--audio-play-size)',
                    },
                })}
                {...others}
            >
                {btnType == 'forward' ? (
                    <IconPlayerSkipForwardFilled
                        style={{
                            width: 'var(--audio-icon-size)',
                            height: 'var(--audio-icon-size)',
                        }}
                    />
                ) : (
                    <IconPlayerSkipBackFilled
                        style={{
                            width: 'var(--audio-icon-size)',
                            height: 'var(--audio-icon-size)',
                        }}
                    />
                )}
            </ActionIcon>
        </Tooltip>
    );
});

AudioSkipButton.displayName = 'AudioSkipButton';
