export type Survey = {
  id: number;
  title: string;
  questions: string | string[];
  userId: number;
  submissionId: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface ISurveyResponse {
  success: boolean;
  data: {
    surveys: Survey[],
    totalItem: number,
  }
}
