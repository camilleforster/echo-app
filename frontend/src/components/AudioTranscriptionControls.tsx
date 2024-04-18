import * as React from "react";
import {
  Container,
  Content,
  SelectionItem,
  SelectionItemLabel,
} from "./styles/AudioTranscriptionControls.styled";
import GradientSwitch from "./GradientSwitch";
import NumberForm from "./NumberForm";
import { useTranscriptionControls } from "../contexts/TranscriptionControlsContext";
import NotationToggle from "./NotationToggle";

const AudioTranscriptionControls = () => {
  const {
    leftHanded,
    toggleLeftHanded,
    playback,
    togglePlayback,
    capoValue,
    decrementCapo,
    incrementCapo,
    selectedNotation,
    setSelectedNotation,
  } = useTranscriptionControls();

  return (
    <Container>
      <Content>
        <SelectionItem>
          <SelectionItemLabel>Left Handed</SelectionItemLabel>
          <GradientSwitch
            testID="left-handed-switch"
            value={leftHanded}
            onToggle={toggleLeftHanded}
          />
        </SelectionItem>
        <SelectionItem>
          <SelectionItemLabel>Capo</SelectionItemLabel>
          <NumberForm
            testID="capo-number-form"
            value={capoValue}
            onDecrease={decrementCapo}
            onIncrease={incrementCapo}
          />
        </SelectionItem>
        <SelectionItem>
          <SelectionItemLabel>Notation</SelectionItemLabel>
          <NotationToggle
            testID="notation-toggle"
            selectedValue={selectedNotation}
            onClick={setSelectedNotation}
          />
        </SelectionItem>
        <SelectionItem>
          <SelectionItemLabel>Playback</SelectionItemLabel>
          <GradientSwitch
            testID="playback-switch"
            value={playback}
            onToggle={togglePlayback}
          />
        </SelectionItem>
      </Content>
    </Container>
  );
};
export default AudioTranscriptionControls;
