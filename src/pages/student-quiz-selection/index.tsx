import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SectionContainer } from '../../components';
import Spinner from '../../components/common/spinner';
import { RootState } from '../../store';
import { setCredentials } from '../../store/features/auth/authSlice';
import { useGetUserDetailsQuery } from '../../store/services/auth/atuhService';

const StudQuizSelect = () => {
  return (
    <div>
      Lorem Ipsum
    </div>
  );
};

export default StudQuizSelect;