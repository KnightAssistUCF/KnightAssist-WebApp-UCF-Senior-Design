import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentExplore from '../components/StudentExplore/StudentExplore';
import PostVerifiedQuestions from '../components/PostVerifiedQuestions/PostVerifiedQuestions';

const PostVerificationQuestionsPage = () =>
{
    return(
      <div className="postVerifyQsPage">
	<PostVerifiedQuestions/>
      </div>
    );
};

export default PostVerificationQuestionsPage;
