-- Seed data for Talaty platform
-- This script adds sample data for development and testing

-- Insert sample users
INSERT INTO users (company_name, company_type, first_name, last_name, email, phone, password_hash, kyc_status) VALUES
('Dupont SARL', 'sarl', 'Jean', 'Dupont', 'jean.dupont@example.com', '+33123456789', '$2b$10$example_hash', 'pending'),
('Martin SAS', 'sas', 'Marie', 'Martin', 'marie.martin@example.com', '+33987654321', '$2b$10$example_hash', 'verified'),
('Petit EURL', 'eurl', 'Pierre', 'Petit', 'pierre.petit@example.com', '+33456789123', '$2b$10$example_hash', 'pending');

-- Insert sample KYC verifications
INSERT INTO kyc_verifications (user_id, step, status, data) VALUES
(1, 'identity', 'completed', '{"document_type": "passport", "verified": true}'),
(1, 'address', 'pending', '{"document_type": "utility_bill", "verified": false}'),
(2, 'identity', 'completed', '{"document_type": "id_card", "verified": true}'),
(2, 'address', 'completed', '{"document_type": "bank_statement", "verified": true}'),
(2, 'final', 'completed', '{"overall_status": "verified"}');

-- Insert sample documents
INSERT INTO documents (user_id, document_type, file_name, file_size, mime_type, status) VALUES
(1, 'identity', 'passport_jean_dupont.pdf', 2048576, 'application/pdf', 'uploaded'),
(1, 'address', 'utility_bill_dupont.pdf', 1024768, 'application/pdf', 'uploaded'),
(2, 'identity', 'id_card_marie_martin.jpg', 512000, 'image/jpeg', 'uploaded'),
(2, 'financial', 'balance_sheet_2023.pdf', 4096000, 'application/pdf', 'uploaded'),
(2, 'financial', 'bank_statements_q4.pdf', 3072000, 'application/pdf', 'uploaded');

-- Insert sample credit scores
INSERT INTO credit_scores (user_id, overall_score, risk_level, financial_health, document_quality, business_stability, credit_history, recommendation, factors) VALUES
(2, 85, 'low', 88, 90, 82, 85, 'Excellent profil de crédit avec une forte stabilité financière', 
 '{"strengths": ["Bonne santé financière", "Documents complets", "Historique stable"], "improvements": ["Diversifier les revenus"]}');

-- Insert sample audit logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, new_values, ip_address) VALUES
(1, 'USER_REGISTERED', 'user', 1, '{"email": "jean.dupont@example.com", "company": "Dupont SARL"}', '192.168.1.100'),
(1, 'DOCUMENT_UPLOADED', 'document', 1, '{"type": "identity", "filename": "passport_jean_dupont.pdf"}', '192.168.1.100'),
(2, 'KYC_COMPLETED', 'kyc_verification', 3, '{"status": "verified"}', '192.168.1.101'),
(2, 'SCORE_CALCULATED', 'credit_score', 1, '{"score": 85, "risk_level": "low"}', '192.168.1.101');
