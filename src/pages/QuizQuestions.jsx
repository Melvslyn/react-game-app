import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizGame = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/questions");
        setQuestions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllQuestions();
  }, []);

  console.log(questions);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/questions/${id}`);
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#b3e5fc', padding: '20px', margin: '10px'}}>
      <h1 className="mb-4">Questions</h1>
      <div className="row">
        {questions.length === 0 ? (
          <div>Loading questions...</div>
        ) : (
          questions.map((question) => (
            <div key={question.id} className="col-md-6 col-lg-4">
              <div className="card mb-3" style={{ backgroundColor: '#1565c0', color: '#FFFFFF' }}>
                <div className="card-body">
                  <h5 className="card-title">{question.question}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Category: {question.category}</h6>
                  <div className="btn-group">
                    <button className="btn btn-danger" onClick={() => handleDelete(question.id)} style={{ margin: '10px' }}>
                      Delete
                    </button>
                    <button className="btn btn-primary" style={{ margin: '10px' }}>
                      <Link
                        to={`/update/${question.id}`}
                        style={{ color: '#FFFFFF', textDecoration: 'none' }}
                      >
                        Update
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mb-4">
        <button className="btn btn-primary" style={{ backgroundColor: '#1565c0', margin: '10px' }}>
          <Link to="/add" style={{ color: '#FFFFFF', textDecoration: 'none'}}>
            Add
          </Link>
        </button>
        <button className="btn btn-primary" style={{ backgroundColor: '#1565c0' }}>
          <Link to="/admin" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Go Back
          </Link>
        </button>
      </div>
    </div>
  );
};

export default QuizGame;
