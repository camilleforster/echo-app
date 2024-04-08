# import os
# import pytest

# from audio_analyzer_interface import AudioAnalyzer

# @pytest.fixture
# def analyzer_params():
#     sampling_rate =  0
#     chunk_size = 0
#     channels = 0
#     return (sampling_rate, chunk_size, channels)


# @pytest.fixture
# def analyzer(analyzer_params):
#     return AudioAnalyzer(analyzer_params[0], analyzer_params[1], analyzer_params[2])


# def test_init(analyzer, analyzer_params):
#     assert isinstance(analyzer, AudioAnalyzer)
#     assert analyzer.sampling_rate == analyzer_params[0]
#     assert analyzer.chunk_size == analyzer_params[1]
#     assert analyzer.channels == analyzer_params[2]


# def test_frequencies_to_note_name(analyzer):
# 	pass

