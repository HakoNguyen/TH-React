"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReview } from "@@/../services/DanhGiaDichVu/reviews";
import { Form, Input, Button, Rate, message, Card } from "antd";

const schema = z.object({
  appointmentId: z.string(),
  employeeId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ReviewForm({
  appointmentId,
  employeeId,
}: {
  appointmentId: string;
  employeeId: string;
}) {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { appointmentId, employeeId, rating: 5 },
  });

  const onSubmit = (data: FormData) => {
    const result = createReview(data);
    if ("error" in result) {
      message.error(result.error);
    } else {
      message.success("Đánh giá đã được gửi!");
    }
  };

  return (
    <Card title="Gửi Đánh Giá" bordered={false} style={{ maxWidth: 500, margin: "auto" }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Rating */}
        <Form.Item label="Đánh giá (1-5)">
          <Rate
            allowHalf
            defaultValue={5}
            onChange={(value) => setValue("rating", value)}
          />
        </Form.Item>

        {/* Bình luận */}
        <Form.Item label="Bình luận">
          <Input.TextArea rows={4} {...register("comment")} placeholder="Nhập bình luận của bạn..." />
        </Form.Item>

        {/* Nút gửi */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Gửi Đánh Giá
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
