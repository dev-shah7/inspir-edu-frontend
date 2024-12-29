import React, { useEffect, useState } from "react";
import useCourseStore from "../../store/useCourseStore";
import CourseBreadCrumb from "./CourseBreadCrumb";
import CourseNav from "./CourseNav";
import Loader from "../../../components/common/Loader/Loader";
import { useParams } from "react-router";
import BackButton from "../../../components/common/BackButton/BackButton";

const CourseContent = ({ children, showNav = true }) => {
    const { getEnrolledCourse, isLoading } = useCourseStore();
    const { courseId } = useParams();

    useEffect(() => {
        if (courseId)
            fetchCourse(courseId);
    }, [getEnrolledCourse, courseId]);

    const fetchCourse = async (id) => {
        try {
            await getEnrolledCourse(id);
        } catch (error) {
            console.error("Failed to fetch enrolled course:", error);
        }
    };

    return (
        <>
            <BackButton />
            <CourseBreadCrumb />
            {showNav && <CourseNav />}
            {isLoading ? <Loader /> : children}
        </>
    );
};

export default CourseContent;
