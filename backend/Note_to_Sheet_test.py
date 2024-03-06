import os
import subprocess
import lilypond

# Define the output directory
output_dir = "output"

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

# LilyPond code as a Python string
lilypond_code = """
\\version "2.20.0"

\\header {
  title = "A Simple Melody"
  composer = "Composer Name"
}

\\score {
  \\relative c' {
    \\key c \\major
    \\time 4/4
    c4 d e f | g a b c | c b a g | f e d c |
  }
  \\layout { }
  \\midi { }
}
"""

# Path to the LilyPond file within the output directory
file_path = os.path.join(output_dir, "file.ly")

# Writing the LilyPond code to a file in the output directory
with open(file_path, "w") as file:
    file.write(lilypond_code)

# Running LilyPond to process the file with the cwd parameter set to the output directory
subprocess.run([str(lilypond.executable()), file_path], cwd=output_dir)

print(f"LilyPond file '{file_path}' has been created and processed. Check the '{output_dir}' directory for the output files.")



