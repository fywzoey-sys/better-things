/** Shared enums. Missing data is never interpreted as "cannot be booked". */
export const FIELD_STATUS = Object.freeze({
  NOT_SUPPLIED: 'not_supplied',     // 未补充：还没有录入这项数据
  UNVERIFIED: 'unverified',         // 未核验：有数据但无人核对来源
  VERIFIED: 'verified',             // 已核验：人工核对过来源
  NEEDS_REVIEW: 'needs_review',     // 需要复核：来源冲突/可能过期/自动检查发现变化
  NOT_APPLICABLE: 'not_applicable'  // 不适用
});
export const FIELD_STATUS_LABEL = Object.freeze({
  not_supplied: '未补充', unverified: '未核验', verified: '已核验',
  needs_review: '需要复核', not_applicable: '不适用'
});
export const FIELD_STATUS_VALUES = Object.values(FIELD_STATUS);

export const SOURCE_STATUS = Object.freeze({
  OK: 'ok', FETCH_FAILED: 'fetch_failed', BLOCKED: 'blocked', PARSE_FAILED: 'parse_failed',
  ROBOTS_DISALLOWED: 'robots_disallowed', REDIRECT_OFFSITE: 'redirect_offsite'
});

export const PLACE_STATUS = Object.freeze({
  UNCHANGED: 'unchanged', CANDIDATE_CHANGES: 'candidate_changes', FETCH_FAILED: 'fetch_failed',
  BLOCKED: 'blocked', PARSE_FAILED: 'parse_failed', CONFLICT: 'conflict', LINK_INVALID: 'link_invalid',
  SKIPPED: 'skipped'
});
export const PLACE_STATUS_LABEL = Object.freeze({
  unchanged: '来源正常，未发现变化', candidate_changes: '发现候选变化，待人工审核',
  fetch_failed: '访问失败', blocked: '来源拒绝自动访问（未绕过）', parse_failed: '无法解析',
  conflict: '来源数据冲突', link_invalid: '预约链接无效', skipped: '已跳过'
});
