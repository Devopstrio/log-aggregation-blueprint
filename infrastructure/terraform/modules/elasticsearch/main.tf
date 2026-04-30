resource "aws_opensearch_domain" "log_storage" {
  domain_name    = "log-aggregation-domain-${var.env}"
  engine_version = "OpenSearch_2.8"

  cluster_config {
    instance_type          = "t3.medium.search"
    instance_count         = 3
    dedicated_master_enabled = true
    dedicated_master_type   = "t3.medium.search"
    dedicated_master_count  = 3
    zone_awareness_enabled  = true
  }

  ebs_options {
    ebs_enabled = true
    volume_size = 50
    volume_type = "gp3"
  }

  vpc_options {
    subnet_ids = var.private_subnet_ids
    security_group_ids = [var.opensearch_sg_id]
  }

  encrypt_at_rest {
    enabled = true
  }

  node_to_node_encryption {
    enabled = true
  }

  domain_endpoint_options {
    enforce_https = true
    tls_security_policy = "Policy-Min-TLS-1-2-2019-07"
  }
}
