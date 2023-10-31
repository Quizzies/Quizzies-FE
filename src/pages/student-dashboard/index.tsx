import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SectionContainer } from '../../components';
import Spinner from '../../components/common/spinner';
import { RootState } from '../../store';
import { setCredentials } from '../../store/features/auth/authSlice';
import { useGetUserDetailsQuery } from '../../store/services/auth/atuhService';

const StudentDashboard = () => {
	const { userInfo } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
		pollingInterval: 900000,
	});

	useEffect(() => {
		if (data) dispatch(setCredentials(data));
	}, [data, dispatch]);

	if (isFetching) return <Spinner type="spinner" />;

	function goToCourse(courseId: number) {
		navigate(`/course/${courseId}`);
	}

	return (
		<>
			<SectionContainer>
				<p className="header-title">Student Courses</p>
				<hr className="fit" />
			</SectionContainer>
			<SectionContainer additionalStyles="pt-0">
				<p className="p-primary">Enrolled Courses</p>
				{userInfo?.courses &&
					userInfo.courses.map((course) => (
						<p
							onClick={() => goToCourse(course.courseId)}
							className="clickable"
							key={course.courseId}
						>
							CS {course.courseId} - {course.courseName}
						</p>
					))}
			</SectionContainer>
		</>
	);
};

export default StudentDashboard;
