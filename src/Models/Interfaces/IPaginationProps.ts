export interface IPaginationProps {
  skip: number;
  take: number;
  total: number;
  goToPage: (page: number) => void;
}
