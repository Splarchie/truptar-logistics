# Truptar Logistics

## Current State
The app has a Motoko backend with shipping order CRUD and user profiles. However, the frontend uses `localStorage` for critical data:
- Order statuses (Processing / In Transit / Out for Delivery / Delivered) are stored in localStorage and never persisted to the backend
- Service requests from all service pages are stored in localStorage only
- ShippingFormPage silently ignores backend errors, so orders may not be saved
- DashboardPage and AdminPanel read statuses from localStorage — so changes don't sync across devices/sessions
The backend only has 4 status variants: `pending | in_transit | delivered | cancelled`, missing `processing` and `out_for_delivery`.

## Requested Changes (Diff)

### Add
- Backend: `processing` and `out_for_delivery` status variants to `ShippingOrder`
- Backend: `ServiceRequest` type with fields: id, serviceType, submittedAt, data (as JSON text), submittedBy (Principal)
- Backend: `submitServiceRequest(req)` method (accessible by users)
- Backend: `getAllServiceRequests()` admin-only query
- Backend: `getMyServiceRequests()` user query
- Frontend: `useServiceRequests`, `useSubmitServiceRequest`, `useAllServiceRequests` hooks
- Frontend: Auto-polling in AdminPanel and DashboardPage (every 10 seconds)

### Modify
- Backend: Status variant type from `pending | in_transit | delivered | cancelled` to `pending | processing | in_transit | out_for_delivery | delivered | cancelled`
- Frontend: AdminPanel — remove all localStorage status reads/writes; use backend status directly; map Processing -> processing, In Transit -> in_transit, Out for Delivery -> out_for_delivery, Delivered -> delivered
- Frontend: DashboardPage — remove all localStorage status reads; display status from backend order object directly
- Frontend: ShippingFormPage — await backend call before navigating; do not silently ignore errors
- Frontend: All service pages (EcommerceFulfillmentPage, ExpressParcelPage, HeavyEquipmentPage, DoorToDoorPage, WarehousingPage, SpecialRequestPage, CorporateLogisticsPage, CustomsClearancePage) — on form submit, call `submitServiceRequest` backend method instead of localStorage
- Frontend: AdminPanel service-requests tab — use `useAllServiceRequests` hook instead of localStorage

### Remove
- All `localStorage.setItem/getItem` calls related to `truptar_order_statuses` and `truptar_service_requests`

## Implementation Plan
1. Generate new Motoko backend with extended status types and service request support
2. Update useQueries.ts to add service request hooks and update status type mapping
3. Update AdminPanel to use backend statuses and backend service requests
4. Update DashboardPage to read status from backend order directly
5. Update ShippingFormPage to not silently ignore backend failures
6. Update all service pages to call submitServiceRequest
