/**
 * PHASE-2 PLACEHOLDER — intentionally does nothing over the network and is not wired into any workflow.
 *
 * Phase 2 flow: human marks entries in data/monitor/approvals.json (see approvals.schema.md) ->
 * buildPullRequestPlan() turns approved entries into a list of patch operations + PR text ->
 * a separate, permission-gated workflow applies the plan on a new branch and opens a PR.
 * Merging that PR is the "human approval" that publishes to production through the existing deployment.
 */
export function buildPullRequestPlan(report, approvals) {
  const approved = new Set((approvals && approvals.approved) || []); // ids: `${placeId}:${field}:${sourceId}`
  const ops = [];
  for (const p of report.places) for (const c of p.changes) {
    const id = `${p.placeId}:${c.field}:${c.sourceId}`;
    if (!approved.has(id) || c.withheld) continue;
    ops.push({ id, placeId: p.placeId, target: c.formalPath, from: c.oldValue, to: c.candidateValue, sourceUrl: c.sourceUrl, fetchedAt: c.fetchedAt, evidence: c.evidence,
      requiresManualFieldStatus: true });
  }
  return {
    ready: ops.length > 0,
    branch: `data-update/${report.runId}`,
    title: `数据更新：${ops.length} 项经人工批准的地点信息`,
    body: ['以下条目经人工批准，来源与证据见报告：', ...ops.map((o) => `- ${o.placeId} · ${o.target}：${o.sourceUrl}`)].join('\n'),
    operations: ops,
    // Phase 2 prerequisites are listed in MONITOR-V1.md ("第二期准备条件").
    note: 'PLAN ONLY. 本函数不写文件、不访问网络、不创建 PR。'
  };
}
