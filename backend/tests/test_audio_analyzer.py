import os
import pytest

from audio_processing import AudioAnalyzer

# @pytest.fixture
# def analyzer_params():
#     sampling_rate =  0
#     chunk_size = 0
#     channels = 0
#     return (sampling_rate, chunk_size, channels)


@pytest.fixture
def analyzer():
    return AudioAnalyzer()


def test_init(analyzer):
    assert isinstance(analyzer, AudioAnalyzer)


