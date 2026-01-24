const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const chunks: Blob[] = [];

  mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(chunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('file', audioBlob);

    // Send to your Render Backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/evaluate_speaking`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log("AI Feedback:", data.feedback);
  };
  mediaRecorder.start();
};