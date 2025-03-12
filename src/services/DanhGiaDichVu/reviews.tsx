'use client';
import { getLocalData, setLocalData } from '../DichVu/storage';
import type { Review, Appointment } from '../../models/lib_for_service/types';
import { z } from 'zod';

const reviewSchema = z.object({
  appointmentId: z.string(),
  employeeId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export const createReview = (data: unknown): Review | { error: string } => {
  const parsedData = reviewSchema.safeParse(data);
  if (!parsedData.success) return { error: 'Invalid data' };

  const { appointmentId, employeeId, rating, comment } = parsedData.data;

  // Kiểm tra lịch hẹn đã hoàn thành
  const appointments = getLocalData('appointments', [] as Appointment[]);
  const appointment = appointments.find(
    (a: Appointment) => a.id === appointmentId && a.status === 'Hoàn thành'
  );
  if (!appointment) return { error: 'Appointment not completed' };

  const reviews = getLocalData('reviews', [] as Review[]);
  const newReview: Review = {
    id: crypto.randomUUID(),
    appointmentId,
    employeeId,
    rating,
    comment,
  };
  reviews.push(newReview);
  setLocalData('reviews', reviews);

  return newReview;
};

export const updateReviewResponse = (id: string, response: string): Review | { error: string } => {
  const reviews = getLocalData('reviews', [] as Review[]);
  const reviewIndex = reviews.findIndex((r: Review) => r.id === id);
  if (reviewIndex === -1) return { error: 'Review not found' };

  reviews[reviewIndex].response = response;
  setLocalData('reviews', reviews);
  return reviews[reviewIndex];
};