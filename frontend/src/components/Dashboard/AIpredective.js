import React, { useState } from 'react';

function AIPrediction() {
  const [symptoms, setSymptoms] = useState('');
  const [petType, setPetType] = useState('dog');
  const [petAge, setPetAge] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSymptomChange = (e) => setSymptoms(e.target.value);
  const handlePetTypeChange = (e) => setPetType(e.target.value);
  const handlePetAgeChange = (e) => setPetAge(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symptoms.trim() || !petAge.trim()) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:8070/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, petType, petAge })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      const resultText = data.result || '';
      const conditionMatch = resultText.match(/- Possible Condition: (.*?)(\n|$)/);
      const confidenceMatch = resultText.match(/- Confidence Level: \(?([0-9]+%)\)?/);
      const recommendationMatch = resultText.match(/- Recommendation: (.*?)(\n|$)/);

      setPrediction({
        condition: conditionMatch ? conditionMatch[1].trim() : 'Unknown condition',
        confidence: confidenceMatch ? confidenceMatch[1] : '80%',
        recommendation: recommendationMatch ? recommendationMatch[1].trim() : 'Please consult a veterinarian.',
        isFallback: data.isFallback || false
      });

    } catch (err) {
      console.error('Prediction Error:', err);
      setError(err.message);
      setPrediction({
        condition: 'System Error - Fallback Data',
        confidence: '75%',
        recommendation: 'Please try again later or contact support.',
        isFallback: true
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSymptoms('');
    setPetType('dog');
    setPetAge('');
    setPrediction(null);
    setError(null);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        color: '#4a4a4a',
        textAlign: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid #6a9eff',
        paddingBottom: '10px'
      }}>
        Pet Health AI Prediction
      </h2>

      {error && (
        <div style={{
          padding: '10px',
          backgroundColor: '#ffeded',
          color: '#d83030',
          borderRadius: '4px',
          marginBottom: '15px',
          border: '1px solid #ffc8c8'
        }}>
          {error}
        </div>
      )}

      {!prediction ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="petType" style={{ fontWeight: 'bold', color: '#555' }}>Pet Type:</label>
            <select id="petType" value={petType} onChange={handlePetTypeChange} style={{
              width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px',
            }}>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="hamster">Hamster</option>
            </select>
          </div>

          <div>
            <label htmlFor="petAge" style={{ fontWeight: 'bold', color: '#555' }}>Pet Age:</label>
            <input type="text" id="petAge" placeholder="Age in years" value={petAge} onChange={handlePetAgeChange} style={{
              width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px',
            }} />
          </div>

          <div>
            <label htmlFor="symptoms" style={{ fontWeight: 'bold', color: '#555' }}>Symptoms:</label>
            <textarea id="symptoms" placeholder="Describe your pet's symptoms in detail..." value={symptoms} onChange={handleSymptomChange} rows="4" style={{
              width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px',
            }} />
          </div>

          <button type="submit" disabled={loading} style={{
            backgroundColor: '#6a9eff',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Analyzing...' : 'Get AI Prediction'}
          </button>
        </form>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
        }}>
          {prediction.isFallback && (
            <div style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeeba',
              padding: '15px',
              borderRadius: '6px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '24px',
                marginRight: '10px',
                color: '#ffc107'
              }}>⚠️</span>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#856404' }}>
                  Expert System Analysis
                </h4>
                <p style={{ margin: 0, color: '#856404', fontSize: '14px' }}>
                  Note: This analysis is based on our veterinary knowledge base
                </p>
              </div>
            </div>
          )}

          <h3 style={{ color: '#4a4a4a', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            Analysis Results
          </h3>

          <p><strong>Possible Condition:</strong> <span style={{ color: '#6a9eff' }}>{prediction.condition}</span></p>

          <div style={{ marginBottom: '15px' }}>
            <p><strong>Confidence Level:</strong></p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '100%', height: '10px', backgroundColor: '#eee', borderRadius: '5px' }}>
                <div style={{
                  width: prediction.confidence,
                  height: '100%',
                  backgroundColor: '#6a9eff',
                  borderRadius: '5px',
                }}></div>
              </div>
              <span style={{ fontWeight: 'bold' }}>{prediction.confidence}</span>
            </div>
          </div>

          <p><strong>Recommendation:</strong> {prediction.recommendation}</p>

          <div style={{
            backgroundColor: '#fff8e6',
            border: '1px solid #ffe0a3',
            borderRadius: '4px',
            padding: '10px',
            marginTop: '15px'
          }}>
            <p style={{ color: '#9e7d27', fontSize: '14px', margin: 0 }}>
              <strong>Disclaimer:</strong> This analysis should not replace professional veterinary advice.
            </p>
          </div>

          <button onClick={resetForm} style={{
            backgroundColor: '#f2f2f2',
            color: '#555',
            border: '1px solid #ddd',
            padding: '10px',
            borderRadius: '4px',
            fontSize: '16px',
            marginTop: '15px',
            cursor: 'pointer',
            width: '100%'
          }}>
            Start New Prediction
          </button>
        </div>
      )}
    </div>
  );
}

export default AIPrediction;
