import {
  BehaviorOnMxFailure,
  BulkEmailContent,
  BulkEmailEntry,
  BulkEmailEntryResult,
  Destination,
  DkimSigningAttributes,
  DkimSigningAttributesOrigin,
  DkimStatus,
  DomainDeliverabilityTrackingOption,
  EmailContent,
  EmailTemplateContent,
  EventDestinationDefinition,
  HttpsPolicy,
  ListManagementOptions,
  MessageTag,
  ScalingMode,
  SuppressionListReason,
  Tag,
  Topic,
  TopicPreference,
  VdmOptions,
} from "./models_0";
export interface PutConfigurationSetSuppressionOptionsRequest {
  ConfigurationSetName: string | undefined;
  SuppressedReasons?: SuppressionListReason[] | undefined;
}
export interface PutConfigurationSetSuppressionOptionsResponse {}
export interface PutConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string | undefined;
  CustomRedirectDomain?: string | undefined;
  HttpsPolicy?: HttpsPolicy | undefined;
}
export interface PutConfigurationSetTrackingOptionsResponse {}
export interface PutConfigurationSetVdmOptionsRequest {
  ConfigurationSetName: string | undefined;
  VdmOptions?: VdmOptions | undefined;
}
export interface PutConfigurationSetVdmOptionsResponse {}
export interface PutDedicatedIpInPoolRequest {
  Ip: string | undefined;
  DestinationPoolName: string | undefined;
}
export interface PutDedicatedIpInPoolResponse {}
export interface PutDedicatedIpPoolScalingAttributesRequest {
  PoolName: string | undefined;
  ScalingMode: ScalingMode | undefined;
}
export interface PutDedicatedIpPoolScalingAttributesResponse {}
export interface PutDedicatedIpWarmupAttributesRequest {
  Ip: string | undefined;
  WarmupPercentage: number | undefined;
}
export interface PutDedicatedIpWarmupAttributesResponse {}
export interface PutDeliverabilityDashboardOptionRequest {
  DashboardEnabled: boolean | undefined;
  SubscribedDomains?: DomainDeliverabilityTrackingOption[] | undefined;
}
export interface PutDeliverabilityDashboardOptionResponse {}
export interface PutEmailIdentityConfigurationSetAttributesRequest {
  EmailIdentity: string | undefined;
  ConfigurationSetName?: string | undefined;
}
export interface PutEmailIdentityConfigurationSetAttributesResponse {}
export interface PutEmailIdentityDkimAttributesRequest {
  EmailIdentity: string | undefined;
  SigningEnabled?: boolean | undefined;
}
export interface PutEmailIdentityDkimAttributesResponse {}
export interface PutEmailIdentityDkimSigningAttributesRequest {
  EmailIdentity: string | undefined;
  SigningAttributesOrigin: DkimSigningAttributesOrigin | undefined;
  SigningAttributes?: DkimSigningAttributes | undefined;
}
export interface PutEmailIdentityDkimSigningAttributesResponse {
  DkimStatus?: DkimStatus | undefined;
  DkimTokens?: string[] | undefined;
}
export interface PutEmailIdentityFeedbackAttributesRequest {
  EmailIdentity: string | undefined;
  EmailForwardingEnabled?: boolean | undefined;
}
export interface PutEmailIdentityFeedbackAttributesResponse {}
export interface PutEmailIdentityMailFromAttributesRequest {
  EmailIdentity: string | undefined;
  MailFromDomain?: string | undefined;
  BehaviorOnMxFailure?: BehaviorOnMxFailure | undefined;
}
export interface PutEmailIdentityMailFromAttributesResponse {}
export interface PutSuppressedDestinationRequest {
  EmailAddress: string | undefined;
  Reason: SuppressionListReason | undefined;
}
export interface PutSuppressedDestinationResponse {}
export interface SendBulkEmailRequest {
  FromEmailAddress?: string | undefined;
  FromEmailAddressIdentityArn?: string | undefined;
  ReplyToAddresses?: string[] | undefined;
  FeedbackForwardingEmailAddress?: string | undefined;
  FeedbackForwardingEmailAddressIdentityArn?: string | undefined;
  DefaultEmailTags?: MessageTag[] | undefined;
  DefaultContent: BulkEmailContent | undefined;
  BulkEmailEntries: BulkEmailEntry[] | undefined;
  ConfigurationSetName?: string | undefined;
  EndpointId?: string | undefined;
}
export interface SendBulkEmailResponse {
  BulkEmailEntryResults: BulkEmailEntryResult[] | undefined;
}
export interface SendCustomVerificationEmailRequest {
  EmailAddress: string | undefined;
  TemplateName: string | undefined;
  ConfigurationSetName?: string | undefined;
}
export interface SendCustomVerificationEmailResponse {
  MessageId?: string | undefined;
}
export interface SendEmailRequest {
  FromEmailAddress?: string | undefined;
  FromEmailAddressIdentityArn?: string | undefined;
  Destination?: Destination | undefined;
  ReplyToAddresses?: string[] | undefined;
  FeedbackForwardingEmailAddress?: string | undefined;
  FeedbackForwardingEmailAddressIdentityArn?: string | undefined;
  Content: EmailContent | undefined;
  EmailTags?: MessageTag[] | undefined;
  ConfigurationSetName?: string | undefined;
  EndpointId?: string | undefined;
  ListManagementOptions?: ListManagementOptions | undefined;
}
export interface SendEmailResponse {
  MessageId?: string | undefined;
}
export interface TagResourceRequest {
  ResourceArn: string | undefined;
  Tags: Tag[] | undefined;
}
export interface TagResourceResponse {}
export interface TestRenderEmailTemplateRequest {
  TemplateName: string | undefined;
  TemplateData: string | undefined;
}
export interface TestRenderEmailTemplateResponse {
  RenderedTemplate: string | undefined;
}
export interface UntagResourceRequest {
  ResourceArn: string | undefined;
  TagKeys: string[] | undefined;
}
export interface UntagResourceResponse {}
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string | undefined;
  EventDestinationName: string | undefined;
  EventDestination: EventDestinationDefinition | undefined;
}
export interface UpdateConfigurationSetEventDestinationResponse {}
export interface UpdateContactRequest {
  ContactListName: string | undefined;
  EmailAddress: string | undefined;
  TopicPreferences?: TopicPreference[] | undefined;
  UnsubscribeAll?: boolean | undefined;
  AttributesData?: string | undefined;
}
export interface UpdateContactResponse {}
export interface UpdateContactListRequest {
  ContactListName: string | undefined;
  Topics?: Topic[] | undefined;
  Description?: string | undefined;
}
export interface UpdateContactListResponse {}
export interface UpdateCustomVerificationEmailTemplateRequest {
  TemplateName: string | undefined;
  FromEmailAddress: string | undefined;
  TemplateSubject: string | undefined;
  TemplateContent: string | undefined;
  SuccessRedirectionURL: string | undefined;
  FailureRedirectionURL: string | undefined;
}
export interface UpdateCustomVerificationEmailTemplateResponse {}
export interface UpdateEmailIdentityPolicyRequest {
  EmailIdentity: string | undefined;
  PolicyName: string | undefined;
  Policy: string | undefined;
}
export interface UpdateEmailIdentityPolicyResponse {}
export interface UpdateEmailTemplateRequest {
  TemplateName: string | undefined;
  TemplateContent: EmailTemplateContent | undefined;
}
export interface UpdateEmailTemplateResponse {}
export declare const PutEmailIdentityDkimSigningAttributesRequestFilterSensitiveLog: (
  obj: PutEmailIdentityDkimSigningAttributesRequest
) => any;
