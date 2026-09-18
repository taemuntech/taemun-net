export type ScreenTab =
  | 'dispatch'
  | 'calculator'
  | 'essay'
  | 'roster'
  | 'registry';

export interface IvyInstitution {
  id: string;
  name: string;
  shortName: string;
  location: string;
  founded: number;
  crestColor: string;
  latinMotto: string;
  mottoTranslation: string;
  admitRate: string;
  medianSat: number;
  admitCount: number;
  academicIndexThreshold: number;
  undergradEnrollment: string;
  popularMajors: string[];
  facultyReadingFocus: string;
}

export interface EssayCase {
  id: string;
  caseNo: string;
  candidateName: string;
  institution: string;
  matriculationYear: string;
  concentration: string;
  satScore: number;
  title: string;
  act1: {
    label: string;
    paragraphs: string;
    excerpt: string;
    marginaliaTitle: string;
    marginaliaNote: string;
    metrics: { voice: string; hook: string };
  };
  act2: {
    label: string;
    paragraphs: string;
    excerpt: string;
    marginaliaTitle: string;
    marginaliaNote: string;
    metrics: { rhetoric: string; depth: string };
  };
  act3: {
    label: string;
    folio: string;
    excerpt: string;
    committeeDisposition: string;
    verdict: string;
    metrics: { rating: string; status: string };
  };
}

export interface SenateFellow {
  id: string;
  name: string;
  role: string;
  formerRole: string;
  credentials: string;
  institution: string;
  cohort: string;
  titleStatus: string;
  bio: string;
  specialties: string[];
}

export interface CandidateDossier {
  id: string;
  folioNumber: string;
  fullName: string;
  school: string;
  matriculationClass: string;
  gpa: string;
  satScore: number;
  concentration: string;
  targetColleges: string[];
  guardianEmail: string;
  submissionDate: string;
  academicIndex: number;
  senateTier: string;
}
