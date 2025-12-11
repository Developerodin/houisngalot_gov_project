'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';
import { generateMockDocument } from '@/utils/mockData';

const DOCUMENT_TYPES = [
  'Aadhaar Card',
  'PAN Card',
  'Income Certificate',
  'Address Proof',
  'Bank Statement',
  'Photo',
];

export default function DocumentsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleBypass = () => {
    const application = userStorage.getApplication();
    if (!application) {
      router.push('/user/application');
      return;
    }

    // Generate mock documents
    const appWithId = application && typeof application === 'object' && 'id' in application 
      ? (application as { id: string })
      : null;
    if (!appWithId) return;
    
    const mockDocs = DOCUMENT_TYPES.map((type) =>
      generateMockDocument(appWithId.id, type)
    );
    
    userStorage.setDocuments(mockDocs);
    router.push('/user/payment');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    setTimeout(() => {
      const newDocs = Array.from(files).map((file) => ({
        id: `doc_${Date.now()}_${Math.random()}`,
        type: file.name,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        verified: false,
      }));

      const existing = userStorage.getDocuments();
      userStorage.setDocuments([...existing, ...newDocs]);
      setDocuments([...existing, ...newDocs]);
      setUploading(false);
    }, 1000);
  };

  const handleSubmit = () => {
    router.push('/user/payment');
  };

  const existingDocs = userStorage.getDocuments();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0F1F3F' }}>
        Upload Documents
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <p className="mb-6" style={{ color: '#4B5563' }}>
          Please upload the following documents. All documents are required.
        </p>

        <div className="space-y-4 mb-6">
          {DOCUMENT_TYPES.map((type) => {
            const doc = existingDocs.find((d) => d.type === type);
            return (
              <div
                key={type}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <span style={{ color: '#4B5563' }}>{type}</span>
                {doc ? (
                  <span className="text-green-600 text-sm">✓ Uploaded</span>
                ) : (
                  <span className="text-gray-400 text-sm">Pending</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer block"
          >
            <div className="text-4xl mb-2">📄</div>
            <p className="text-lg font-medium mb-2" style={{ color: '#0F1F3F' }}>
              Click to upload or drag and drop
            </p>
            <p className="text-sm" style={{ color: '#4B5563' }}>
              PDF, JPG, PNG (Max 5MB per file)
            </p>
          </label>
        </div>

        {uploading && (
          <div className="text-center mb-4">
            <p style={{ color: '#4B5563' }}>Uploading...</p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            onClick={() => router.push('/user/application')}
            variant="outline"
            fullWidth
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            fullWidth
            bypass
            onBypass={handleBypass}
            disabled={existingDocs.length === 0 && !uploading}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
